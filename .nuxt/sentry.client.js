import VueLib from 'vue'
import * as Sentry from '@sentry/browser'

import { Dedupe, ExtraErrorData, ReportingObserver, RewriteFrames, Vue } from '@sentry/integrations'

export default function (ctx, inject) {
  /* eslint-disable object-curly-spacing, quote-props, quotes, key-spacing, comma-spacing */
  const config = {"dsn":"https:\u002F\u002Fd6352c3a17124246a0effb6282e65e3e@o108936.ingest.sentry.io\u002F5269230","environment":"development"}
  config.integrations = [
    new Dedupe({}),
    new ExtraErrorData({}),
    new ReportingObserver({}),
    new RewriteFrames({}),
    new Vue({ Vue: VueLib, ...{"attachProps":true,"logErrors":true}})
  ]

  /* eslint-enable object-curly-spacing, quote-props, quotes, key-spacing, comma-spacing */
  Sentry.init(config)

  inject('sentry', Sentry)
  ctx.$sentry = Sentry
}
