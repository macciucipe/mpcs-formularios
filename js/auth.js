async function signIn(email, password) {
  const { data, error } = await sbClient.auth.signInWithPassword({ email, password });
  return { data, error };
}

async function signOut() {
  await sbClient.auth.signOut();
}

async function checkSession() {
  const { data } = await sbClient.auth.getSession();
  return data?.session || null;
}
