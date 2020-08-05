package ctxheaders

var (
	defaultOptions = &options{
		HeadersToTags: nil,
	}
)

type options struct {
	HeadersToTags    []string
	HeadersToContext map[string]string
}

type Option func(*options)

func HeadersToTags(v []string) Option {
	return func(o *options) {
		o.HeadersToTags = v
	}
}

// HeadersToContext is a map relationships between headers and context
func HeadersToContext(v map[string]string) Option {
	return func(o *options) {
		o.HeadersToContext = v
	}
}

func evaluateOptions(opts []Option) *options {
	optCopy := &options{}
	*optCopy = *defaultOptions
	for _, o := range opts {
		o(optCopy)
	}
	return optCopy
}
