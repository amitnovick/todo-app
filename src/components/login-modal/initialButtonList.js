import { githubOAuth } from "../../firebase/auth.js";

/**
 * Initial state of the Social Buttons
 */
export default {
  github: {
    visible: true,
    provider: () => {
      const provider = githubOAuth();
      provider.addScope("user");
      return provider;
    }
  }
};
