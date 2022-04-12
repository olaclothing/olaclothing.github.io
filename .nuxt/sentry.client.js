import VueLib from 'vue'
import * as Sentry from '@sentry/browser'
import { Dedupe, ExtraErrorData, ReportingObserver, RewriteFrames, Vue } from '@sentry/integrations'

export default function (ctx, inject) {
  const opts = Object.assign({}, {"dsn":"https:\u002F\u002Fd6352c3a17124246a0effb6282e65e3e@o108936.ingest.sentry.io\u002F5269230","environment":"development"}, {
    integrations: [
      new Dedupe({}),
      new ExtraErrorData({}),
      new ReportingObserver({}),
      new RewriteFrames({}),
      new Vue({Vue: VueLib, ...{"attachProps":true}})
    ]
  })

  // Initialize sentry
  Sentry.init(opts)

  // Inject Sentry to the context as $sentry
  inject('sentry', Sentry)
  ctx.$sentry = Sentry
}
