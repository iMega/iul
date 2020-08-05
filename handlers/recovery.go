package handlers

import (
	"fmt"
	"runtime/debug"
)

func RecoveryHandler(p interface{}) (err error) {
	stack := string(debug.Stack())
	err = fmt.Errorf("GRPC recovery handler error: %s. Stack trace: %s", p, stack)
	return
}
