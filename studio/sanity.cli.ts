import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'v4v0i7gl',
    dataset: 'production',
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
    /**
     * Hosted at https://justmath.sanity.studio/ (docs/DECISIONS.md §39). Recorded here per the
     * CLI's own recommendation after the first `sanity deploy` — pins this deployment to a known
     * app so future deploys don't prompt for it again.
     */
    appId: 'y9gew7u6o2492ftxnfa25hy2',
  },
})
