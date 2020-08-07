package acceptance

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/imega/iul/tests/helper"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

type publishResponse struct {
	Files []File `json:"files"`
}

type File struct {
	Name string `json:"name"`
	Size string `json:"size"`
	MD5  string `json:"md5"`
}

var _ = Describe("Upload a file", func() {
	Context("size file is correct", func() {
		It("file uploaded successfully", func() {
			params := map[string]string{}
			req, err := helper.FileUploadRequest(
				"http://app:8080/api/upload",
				params,
				"file",
				"../src/icons/favicon.ico",
			)
			Expect(err).NotTo(HaveOccurred())

			res, err := http.DefaultClient.Do(req)
			Expect(err).NotTo(HaveOccurred())

			b, err := ioutil.ReadAll(res.Body)
			res.Body.Close()
			Expect(err).NotTo(HaveOccurred())

			actual := publishResponse{}
			err = json.Unmarshal(b, &actual)
			Expect(err).NotTo(HaveOccurred())

			expected := publishResponse{
				Files: []File{
					{
						Name: "favicon.ico",
						Size: "32 kB",
						MD5:  "70ebf714c67c251fc490e040c18e80a2",
					},
				},
			}

			Expect(expected).To(Equal(actual))
		})
	})
})
