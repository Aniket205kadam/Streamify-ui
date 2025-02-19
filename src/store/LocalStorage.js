export const saveAuthInfo = (state) => {
    try {
        if (!state) {
            throw new Error("State my be required");
        }
        const serializedState = JSON.stringify(state);
        localStorage.setItem("authentication", serializedState);
    } catch (error) {
        console.error("Error is found to stored the auth Info: " + error.message);
    }
}

export const loadAuthInfo = () => {
    try {
        const serializedState = localStorage.getItem("authentication");
        if (!serializedState) {
            throw new Error("The authentication is not stored")
        }
        return JSON.parse(serializedState);
    } catch (error) {
      console.log("Error is found to load the Auth Info: " + error.message)  
    }
}

export const saveThemeState = (state) => {
    try {
        if (!state) {
            throw new Error("State my be required");
        }
        const serializedState = JSON.stringify(state);
        localStorage.setItem("theme", serializedState);
    } catch (error) {
        console.error("Error is found to stored the theme state: " + error.message);
    }
}

export const loadThemeState = () => {
    try {
        const serializedState = localStorage.getItem("theme");
        if (!serializedState) {
            throw new Error("The theme is not stored");
        }
        return JSON.parse(serializedState);
    } catch(error) {
        console.error("Error is found to get the state from the local storage: " + error.message);
        return undefined;
    }
}