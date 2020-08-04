package initer

import (
	"github.com/imega/iul/config"
	"github.com/sirupsen/logrus"
)

var (
	logger *logrus.Entry
)

func InitLogger(channel string) *logrus.Entry {
	logLevelStr := config.GetConfigValue("LOG_LEVEL")
	if len(logLevelStr) == 0 {
		logLevelStr = "info"
	}

	logLevel, err := logrus.ParseLevel(logLevelStr)
	if err != nil {
		logLevel = logrus.InfoLevel
	}

	logrus.SetLevel(logLevel)
	logrus.SetFormatter(&logrus.JSONFormatter{
		DisableTimestamp: true,
	})

	commit := config.GetConfigValue("COMMIT")

	logger = logrus.WithFields(
		logrus.Fields{
			"channel": channel,
			"commit":  commit,
		},
	)

	return logger
}
