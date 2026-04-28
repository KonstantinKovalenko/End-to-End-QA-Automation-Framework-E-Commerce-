export async function isLoggedIn(){
    const logoutLink = await $('[href="/logout"]')
    if(await logoutLink.isExisting()){
        return true
    }
    return false
}