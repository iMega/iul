package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"

	"github.com/SebastiaanKlippert/go-wkhtmltopdf"
	"github.com/improbable-eng/go-httpwares/logging/logrus/ctxlogrus"
)

type generateHandlerIn struct {
	Doc          string        `json:"doc"`
	Filename     string        `json:"filename"`
	Num          string        `json:"num"`
	Revision     string        `json:"revision"`
	Title        string        `json:"title"`
	Version      string        `json:"version"`
	Files        []fileInfo    `json:"files"`
	Contributors []Contributor `json:"contributors"`
}

type sheet struct {
	Title        string
	Table        row
	Contributors []Contributor
	File         aboutFile
}

type Contributor struct {
	Title string `json:"title"`
	Name  string `json:"name"`
	Date  string `json:"date"`
}

type row struct {
	Num         string
	Document    string
	Description string
	Version     string
	Left        string
}

type aboutFile struct {
	Name string
	Size string
	MD5  string
}

func generateHandler(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	logger := ctxlogrus.Extract(ctx)

	b, err := ioutil.ReadAll(r.Body)
	defer r.Body.Close()
	if err != nil {
		logger.Errorf("failed to read request body, %s", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var in generateHandlerIn
	if err := json.Unmarshal(b, &in); err != nil {
		logger.Errorf("failed to unmarshal request body, %s", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	s := sheet{
		Title: strings.ReplaceAll(in.Title, "\n", "<br>"),
		Table: row{
			Num:         in.Num,
			Document:    in.Files[0].Name,
			Description: strings.ReplaceAll(in.Doc, "\n", "<br>"),
			Version:     in.Version,
			Left:        in.Revision,
		},
		File: aboutFile{
			Name: in.Files[0].Name,
			Size: in.Files[0].Size,
			MD5:  in.Files[0].MD5,
		},
		Contributors: in.Contributors,
	}

	rr := bytes.NewBufferString("")
	if err := generateTemplateHTML(rr, s); err != nil {
		logger.Errorf("failed to generate template, %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if err := generatePDF(rr, w); err != nil {
		logger.Errorf("failed to create pdf, %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Disposition", "attachment;filename="+strconv.Quote("file.pdf")+";filename*=UTF-8''"+"file.pdf")
	w.Header().Set("Content-Type", "application/pdf")
}

func generatePDF(tmpl *bytes.Buffer, w io.Writer) error {
	pdfg, err := wkhtmltopdf.NewPDFGenerator()
	if err != nil {
		return fmt.Errorf("failed to make instance of PDFGenerator, %s", err)
	}

	pdfg.Orientation.Set(wkhtmltopdf.OrientationPortrait)
	pdfg.MarginTop.Set(14)
	pdfg.MarginBottom.Set(33)
	pdfg.MarginLeft.Set(19)
	pdfg.MarginRight.Set(11)

	pdfg.AddPage(wkhtmltopdf.NewPageReader(tmpl))

	pdfg.SetOutput(w)

	if err := pdfg.Create(); err != nil {
		return fmt.Errorf("failed to create pdf, %s", err)
	}

	return nil
}

func generateTemplateHTML(w io.Writer, s sheet) error {
	const (
		layout = `
<html>
    <head>
        <meta charset="utf-8" />
        <style>
            body {
                font-size: 18px;
                /*font-family: Arial, Helvetica, sans-serif;*/
                margin: 0;
                padding: 0;
            }
            table {
                border-collapse: collapse;
                width: 100%;
            }

            table,
            th,
            td {
                border: 1px solid black;
                padding: 0.5em 0.5em;
                vertical-align: top;
            }
            td.title {
                padding: 1em 0.5em;
            }
            td.center {
                text-align: center;
            }
            td.vcenter {
                vertical-align: middle;
            }
            .footer {
                position: absolute;
                bottom: 0;
                width: 100%;
            }
        </style>
    </head>
    <body>
        <table>
            <tr>
                <td colspan="5" class="title center">{{noescape .Title}}</td>
            </tr>
            <tr>
                <td class="center vcenter" style="width:8.88%;">Номер п/п</td>
                <td class="center vcenter" style="width:30.55%;">
                    Обозначение&nbsp;документа
                </td>
                <td class="center vcenter" style="width:37.8%;">
                    Наименование&nbsp;изделия, наименование&nbsp;документа
                </td>
                <td class="center vcenter" style="width:9.44%;">Версия</td>
                <td class="center vcenter" style="width:13.33%;">
                    Номер последнего изменения
                </td>
            </tr>
            <tr>
                <td class="center vcenter">{{.Table.Num}}</td>
                <td class="vcenter">{{.Table.Document}}</td>
                <td class="vcenter">{{noescape .Table.Description}}</td>
                <td class="center vcenter">{{.Table.Version}}</td>
                <td class="center vcenter">{{.Table.Left}}</td>
            </tr>
        </table>

        <br />
        <table>
            <tr>
                <td class="title center vcenter" style="width:13.33%;">MD5</td>
                <td class="title">{{.File.MD5}}</td>
            </tr>
        </table>

        <br />
        <table>
            <tr>
                <td  class="title" style="width:41.36%;">{{.File.Name}}</td>
                <td  class="title" style="width:28.58%;">Размер {{.File.Size}}</td>
                <td></td>
            </tr>
        </table>

        <br />
        <table>
            {{ range $value := .Contributors }}
            <tr>
                <td style="width:12.78%;">{{$value.Title}}</td>
                <td style="width:28.58%;">{{$value.Name}}</td>
                <td style="width:28.58%;"></td>
                <td>{{$value.Date}}</td>
            </tr>
            {{end}}
        </table>

        <table class="footer">
            <tr>
                <td rowspan="2" class="vcenter center" style="width:45%;">
                    Информационно удостоверяющий лист
                </td>
                <td rowspan="2" class="vcenter center">{{.File.Name}}</td>
                <td class="center" style="width:12.4%;">Лист</td>
                <td class="center" style="width:12.4%;">Листов</td>
            </tr>
            <tr>
                <td class="vcenter center">1</td>
                <td class="vcenter center">1</td>
            </tr>
        </table>
    </body>
</html>
		`
	)

	var fn = template.FuncMap{
		"noescape": noescape,
	}

	l, err := template.New("layout").Funcs(fn).Parse(layout)
	if err != nil {
		return err
	}
	return l.Execute(w, s)
}

func noescape(str string) template.HTML {
	return template.HTML(str)
}
