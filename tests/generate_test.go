package acceptance

import (
	"github.com/imega/iul/tests/helper"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

type Form struct {
	Doc          string        `json:"doc"`
	Filename     string        `json:"filename"`
	Num          string        `json:"num"`
	Revision     string        `json:"revision"`
	Title        string        `json:"title"`
	Version      string        `json:"version"`
	Files        []fileInfo    `json:"files"`
	Contributors []Contributor `json:"contributors"`
}

type Contributor struct {
	Title string `json:"title"`
	Name  string `json:"name"`
	Date  string `json:"date"`
}

type fileInfo struct {
	MD5  string `json:"md5"`
	Name string `json:"name"`
	Size string `json:"size"`
}

var _ = Describe("Generate a pdf", func() {
	Context("all data filled", func() {
		It("pdf generated successfully", func() {
			form := Form{
				Title:    "Информационно-удостоверяющий лист для проектно-сметной документации\n",
				Num:      "1\n",
				Filename: "2\n",
				Doc:      "3\n",
				Version:  "4\n",
				Revision: "5\n",
				Files: []fileInfo{
					{
						MD5:  "0f5649f7d710d7112da69c3aca806304",
						Name: "_IUL_SISTEMA_razmetka_01.pdf",
						Size: "476 kB",
					},
				},
				Contributors: []Contributor{
					{Title: "6\n", Name: "7\n", Date: "8\n"},
					{Title: "9\n", Name: "10\n", Date: "11\n"},
					{Title: "12\n", Name: "13\n", Date: "14\n"},
				},
			}
			res, bc := helper.PostRequest("http://app:8080/api/gendoc", form)
			bc()

			Expect(len(res)).To(Equal(11509))
		})
	})
})
