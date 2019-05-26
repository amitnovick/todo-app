A note-taking app SaaS.

# Technology usage

- React.js for VDOM diffing and JSX syntax as the template language
  - Pure (presentational) view components, composed with stateful container components.
  - Modular components-based code architecture
- State management:
  - Extended-state conveyance using React.js' Context API
  - Event-based reactivity to authentication service updates using `xstate`
  - Documented component behaviour: usage of Statecharts to model our UI transitions, using `xstate`
- Third-party service integrations:
  - Firebase Authentication: User authentication via OAuth protocol: implemented provider: GitHub
  - Cloud Firestore: Real-time document database
- Styling:
  - Modular CSS: Rules are specific to components, using non-conflicting selector names
  - Leveraging the full breadth of CSS rules: via `emotion` for psuedo-selectors and media queries, otherwise using inline styles for most flexible iteration workflow.
  - Leveraging the power and ergonomics of SCSS: using `polished` for common operations like `invert`, `darken`, `lighten`.

# Set-up Instructions

Instructions are found in the accompanying `SCRIPTS.md` file.

Copyright © 2018-2019 Amit Novick
