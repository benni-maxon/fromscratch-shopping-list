const SUPABASE_URL = 'https://eqvhbypqmflvzwpuxohs.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxdmhieXBxbWZsdnp3cHV4b2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMDgwMzAsImV4cCI6MTk4MzY4NDAzMH0.69mAZ8sZWHEPxgHYg8wvmHJc4GleoS6fqfGdJQOWGno';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function checkAuth() {
    const user = getUser();

    if (!user) location.replace('/auth');
}

export async function redirectIfLoggedIn() {
    if (getUser()) {
        location.replace('./list');
    }
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */

export async function getListItems() {
    const response = await client.from('groceries').select().match({ user_id: getUser().id });
    return response.data;
}

export async function createListItem(item, quantity) {
    const response = await client
        .from('groceries')
        .insert({ item, quantity, user_id: getUser().id });

    return response;
}

export async function buyListItem(itemID) {
    const response = await client.from('groceries').update({ bought: true }).match({ id: itemID });

    return response;
}

export async function deleteAllListItems() {
    const response = await client.from('groceries').delete().match({ user_id: getUser().id });

    return response;
}
