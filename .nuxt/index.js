import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'

/* Plugins */

import nuxt_plugin_pluginutils_31cd74ea from 'nuxt_plugin_pluginutils_31cd74ea' // Source: ./nuxt-i18n/plugin.utils.js (mode: 'all')
import nuxt_plugin_pluginrouting_ab772096 from 'nuxt_plugin_pluginrouting_ab772096' // Source: ./nuxt-i18n/plugin.routing.js (mode: 'all')
import nuxt_plugin_pluginmain_312ec04c from 'nuxt_plugin_pluginmain_312ec04c' // Source: ./nuxt-i18n/plugin.main.js (mode: 'all')
import nuxt_plugin_sentryserver_074aaf96 from 'nuxt_plugin_sentryserver_074aaf96' // Source: ./sentry.server.js (mode: 'server')
import nuxt_plugin_sentryclient_d2bd92a6 from 'nuxt_plugin_sentryclient_d2bd92a6' // Source: ./sentry.client.js (mode: 'client')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":false,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp (ssrContext) {
  const router = await createRouter(ssrContext)

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"snipcart-demo-v3","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"Snipcart v3 demonstration store"}],"link":[{"rel":"preconnect","href":"https:\u002F\u002Fapp.snipcart.com"},{"rel":"preconnect","href":"https:\u002F\u002Fcdn.snipcart.com"},{"rel":"preconnect","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Muli:400,700&display=swap"},{"rel":"icon","type":"image\u002Fpng","href":"\u002Ffavicon.png"},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Muli:400,700&display=swap"},{"rel":"preconnect","href":"https:\u002F\u002Fapp.snipcart.com"},{"rel":"preconnect","href":"https:\u002F\u002Fcdn.snipcart.com"},{"rel":"stylesheet","href":"https:\u002F\u002Fcdn.snipcart.com\u002Fthemes\u002Fv3.0\u002Fdefault\u002Fsnipcart.css","defer":true}],"script":[{"src":"https:\u002F\u002Fcdn.snipcart.com\u002Fthemes\u002Fv3.0\u002Fdefault\u002Fsnipcart.js","defer":true}],"style":[]},

    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  const inject = function (key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error(`inject('${key}', value) has no value provided`)
    }

    key = '$' + key
    // Add into app
    app[key] = value

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Object.prototype.hasOwnProperty.call(Vue, key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  // Plugin execution

  if (typeof nuxt_plugin_pluginutils_31cd74ea === 'function') {
    await nuxt_plugin_pluginutils_31cd74ea(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginrouting_ab772096 === 'function') {
    await nuxt_plugin_pluginrouting_ab772096(app.context, inject)
  }

  if (typeof nuxt_plugin_pluginmain_312ec04c === 'function') {
    await nuxt_plugin_pluginmain_312ec04c(app.context, inject)
  }

  if (process.server && typeof nuxt_plugin_sentryserver_074aaf96 === 'function') {
    await nuxt_plugin_sentryserver_074aaf96(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_sentryclient_d2bd92a6 === 'function') {
    await nuxt_plugin_sentryclient_d2bd92a6(app.context, inject)
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    app,
    router
  }
}

export { createApp, NuxtError }
