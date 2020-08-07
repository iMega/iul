package helper

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httputil"

	. "github.com/onsi/gomega"
)

const (
	defaultC = "\x1b[0m"
	cyanC    = "\x1b[36m"
	yellowC  = "\x1b[33m"
)

var (
	dumpReq = func(req *http.Request) {
		dump, err := httputil.DumpRequestOut(req, true)
		Expect(err).To(BeNil())
		fmt.Printf("%s\nREQUEST:\n%s\n%s\n", cyanC, string(dump), defaultC)
	}

	dumpRes = func(res *http.Response) {
		dump, err := httputil.DumpResponse(res, true)
		Expect(err).To(BeNil())
		fmt.Printf("%s\nRESPONSE:\n%s\n%s\n", yellowC, string(dump), defaultC)
	}
)

func PostRequest(url string, b interface{}) ([]byte, func()) {
	ret, err := json.Marshal(b)
	Expect(err).NotTo(HaveOccurred())

	req, err := http.NewRequest(
		http.MethodPost,
		url,
		bytes.NewBuffer(ret),
	)
	Expect(err).NotTo(HaveOccurred())

	// dumpReq(req)

	res, err := http.DefaultClient.Do(req)
	Expect(err).NotTo(HaveOccurred())
	Expect(res.StatusCode).To(Equal(http.StatusOK))

	// dumpRes(res)

	body, err := ioutil.ReadAll(res.Body)
	Expect(err).NotTo(HaveOccurred())

	var bodyClose = func() {
		res.Body.Close()
	}

	return body, bodyClose
}
