const getToken = async (identity: string, ttl?: number) => {
  const url = new URL(
    `${import.meta.env.SOFTPHONE_TWILIO_FUNCTIONS_DOMAIN}/token`
  );

  url.searchParams.append("identity", identity);

  if (ttl) {
    url.searchParams.append("ttl", ttl.toString());
  }

  const response = await fetch(url.toString());
  const data = await response.json();
  return data.token;
};

export { getToken };
