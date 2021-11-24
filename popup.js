const loginButton = document.getElementById("login-button")
const emailInputElement = document.getElementById('email')

let emailStorage

chrome.storage.sync.get('email').then(({ email }) => {
  emailStorage = email
  emailInputElement.value = emailStorage || ''
})

emailInputElement.addEventListener('change', async (e) => await chrome.storage.sync.set({ email: e.target.value }))

loginButton.addEventListener('click', async () => {
  const email = emailInputElement.value
  const password = document.getElementById('password').value

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: triggerLoginAction,
    args: [email, password]
  })
})

async function triggerLoginAction(email, password) {
    if (email) document.getElementById('username').value = email
    console.log(password)
    if (password) document.getElementById('password').value = password

    // TODO: Add a checkbotx to enable/dishable autologin click
    document.querySelector('[type="submit"]').click()
  }
