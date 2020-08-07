package main

import (
	"bytes"
	"os"
	"strings"
	"testing"
)

func Test_generatePDF(t *testing.T) {
	data := sheet{
		Title: strings.ReplaceAll(
			"Информационно-удостоверяющий лист для проектно-сметной документации\nКапитальный ремонт безнапорных канализационных сетей по ул. Бетховена\n(на промежутке от ул. Минеральной до ул. Некрасова), г. Старая Русса", "\n", "<br>"),
		Table: row{
			Num:         "1",
			Document:    "17_20_ИОС_2_1.pdf",
			Description: strings.ReplaceAll("17_20_ИОС_2_1\nСистемы водоснабжения и\nводоотведения\nКнига 1 \"Наружные системы\nводоснабжения и водоотведения\"", "\n", "<br>"),
			Version:     "1",
			Left:        "1",
		},
		Contributors: []Contributor{
			{Title: "Разраб.", Name: "Цветкова С.", Date: "28.01.2020"},
			{Title: "ГАП", Name: "Перепелица П.", Date: "28.01.2020"},
			{Title: "Н. контр.", Name: "Перепелица В.", Date: "28.01.2020"},
		},
		File: aboutFile{
			Name: "17_20_ИОС_2_1.pdf",
			Size: "40 123 КБ",
			MD5:  "4f192317e287e080ab173b52e399acf9",
		},
	}

	in := bytes.NewBufferString("")

	if err := generateTemplateHTML(in, data); err != nil {
		t.Fatal(err)
	}

	buf := new(bytes.Buffer)

	if err := generatePDF(in, buf); err != nil {
		t.Fatal(err)
	}

	f, err := os.Create("test.pdf")
	if err != nil {
		t.Fatal(err)
	}

	if _, err := f.Write(buf.Bytes()); err != nil {
		t.Fatal(err)
	}

	if err := f.Close(); err != nil {
		t.Fatal(err)
	}
}
