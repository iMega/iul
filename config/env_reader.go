package config

import (
	"os"
)

// GetConfigValue reads environment variables
func GetConfigValue(key string) string {
	return os.Getenv(key)
}
