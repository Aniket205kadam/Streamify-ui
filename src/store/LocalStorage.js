export const saveThemeState = (state) => {
    try {
        if (!state) {
            return;
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
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch(error) {
        console.error("Error is found to get the state from the local storage: " + error.message);
        return undefined;
    }
}