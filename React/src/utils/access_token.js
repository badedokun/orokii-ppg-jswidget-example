export async function getOrokiiAccessToken() {
  try {
    const response = await fetch("https://orokii-js-test-proxy.onrender.com/proxy");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result.data.accessToken);
    return result.data.accessToken; // Return response if needed
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null; // Handle failure gracefully
  }
}
