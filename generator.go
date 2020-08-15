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
			Document:    in.Filename,
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

	tmpl := bytes.NewBufferString("")
	if err := generateTemplateHTML(tmpl, s); err != nil {
		logger.Errorf("failed to generate template, %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	if err := generatePDF(tmpl, w); err != nil {
		logger.Errorf("failed to create pdf, %s", err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Disposition", "attachment;filename="+strconv.Quote(in.Filename+"_iul.pdf")+";filename*=UTF-8''"+in.Filename+"_iul.pdf")
	w.Header().Set("Content-Type", "application/pdf")
	w.Header().Set("X-Filename", in.Filename+"_iul.pdf")
}

func generatePDF(tmpl *bytes.Buffer, w io.Writer) error {
	pdfg, err := wkhtmltopdf.NewPDFGenerator()
	if err != nil {
		return fmt.Errorf("failed to make instance of PDFGenerator, %s", err)
	}
	pdfg.Title.Set("https://iul.imega.ru")
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
	layout, err := Asset("pdf.html")
	if err != nil {
		return err
	}

	var fn = template.FuncMap{
		"noescape": noescape,
	}

	l, err := template.New("layout").Funcs(fn).Parse(string(layout))
	if err != nil {
		return err
	}
	return l.Execute(w, s)
}

func noescape(str string) template.HTML {
	return template.HTML(str)
}
