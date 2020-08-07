package humanize

import (
	"golang.org/x/text/language"
	"golang.org/x/text/message"
)

// Bytes represent number only kB
func Bytes(i int64) string {
	p := message.NewPrinter(language.Russian)
	return p.Sprintf("%d %s", i/1000, "kB")
}
