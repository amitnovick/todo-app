import { auth } from "../../auth/oauth.js";

/**
 * Initial state of the Social Buttons
 */
export default {
  github: {
    visible: true,
    provider: () => {
      const provider = auth.githubOAuth();
      provider.addScope("user");
      return provider;
    }
  }
};
