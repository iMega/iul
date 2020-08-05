package main

import (
	"bytes"
	"encoding/json"
	"html/template"
	"io"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/SebastiaanKlippert/go-wkhtmltopdf"
	"github.com/improbable-eng/go-httpwares/logging/logrus/ctxlogrus"
)

type generateHandlerIn struct {
	Doc      string     `json:"doc"`
	Filename string     `json:"filename"`
	Num      string     `json:"num"`
	Revision string     `json:"revision"`
	Title    string     `json:"title"`
	Version  string     `json:"version"`
	Files    []fileInfo `json:"files"`
}

type sheet struct {
	Title        string
	Table        row
	Contributors map[string]string
	File         aboutFile
}

type row struct {
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
		Title: in.Title,
		Table: row{
			Document:    in.Filename,
			Description: in.Doc,
			Version:     in.Version,
			Left:        in.Revision,
		},
		Contributors: map[string]string{
			"aaa": "bbb",
		},
		File: aboutFile{
			Name: in.Files[0].Name,
			Size: strconv.Itoa(int(in.Files[0].Size)),
			MD5:  in.Files[0].MD5,
		},
	}

	pdfg, err := wkhtmltopdf.NewPDFGenerator()
	if err != nil {
		logger.Errorf("failed to make instance of PDFGenerator, %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	rr := bytes.NewBufferString("")
	if err := generateTemplateHTML(rr, s); err != nil {
		logger.Errorf("failed to generate tempalte, %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	pdfg.AddPage(wkhtmltopdf.NewPageReader(rr))

	w.Header().Set("Content-Disposition", "attachment;filename="+strconv.Quote("file.pdf")+";filename*=UTF-8''"+"file.pdf")
	w.Header().Set("Content-Type", "application/pdf")

	pdfg.SetOutput(w)
	if err = pdfg.Create(); err != nil {
		logger.Errorf("failed to create pdf, %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
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
                padding: 1em 0.5em;
                vertical-align: top;
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
                <td colspan="5" class="center">
                    Информационно-удостоверяющий лист для проектно-сметной
                    документации<br />{{.Title}}
                </td>
            </tr>
            <tr>
                <td>Номер п/п</td>
                <td>Обозначение документа</td>
                <td>Наименование изделия, наименование документа</td>
                <td>Версия</td>
                <td>Номер последнего изменения</td>
            </tr>
            <tr>
                <td></td>
                <td>{{.Table.Document}}</td>
                <td>{{.Table.Description}}</td>
                <td>{{.Table.Version}}</td>
                <td>{{.Table.Left}}</td>
            </tr>
        </table>
        <br />
        <table>
            <tr>
                <td>Имя</td>
                <td>{{.File.Name}}</td>
            </tr>
            <tr>
                <td>Размер</td>
                <td>{{.File.Size}}</td>
            </tr>
            <tr>
                <td>MD5</td>
                <td>{{.File.MD5}}</td>
            </tr>
        </table>
        <br />
        <table>
            {{ range $key, $value := .Contributors }}
            <tr>
                <td>{{$key}}</td>
                <td>{{$value}}</td>
                <td>Подпись</td>
                <td>Дата</td>
            </tr>
            {{end}}
        </table>
        <table class="footer">
            <tr>
                <td rowspan="2" class="vcenter">
                    Информационно удостоверяющий лист
                </td>
                <td rowspan="2" class="vcenter">{{.File.Name}}</td>
                <td class="center">Лист</td>
                <td class="center">Листов</td>
            </tr>
            <tr>
                <td>1</td>
                <td>1</td>
            </tr>
        </table>
    </body>
</html>


		`
	)
	l, err := template.New("layout").Parse(layout)
	if err != nil {
		return err
	}
	return l.Execute(w, s)
}
