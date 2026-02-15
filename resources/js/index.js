'use strict'

document.addEventListener('DOMContentLoaded', async event => {

    await loadPage('./resources/views/inicio.html', '#content')

    // visualizar o no el div 'toggle-menu' y las opciones del menu
    document.querySelector('#toggle-menu').addEventListener('click', e => {
        document.querySelector('#toggle-menu').classList.toggle('hidden')
        document.querySelector('#toggle-menu + ul').classList.toggle('hidden')
    })

    // controlar la carga de opciones a partir de páginas locales en modo SPA
    const options = document.querySelectorAll('#toggle-menu + ul > li')
    options.forEach(option => option.addEventListener('click', e => selectOption(e)))

})

async function selectOption(e) {

    e.preventDefault()
    const option = e.target.textContent.toLowerCase()

    switch (option) {
        case 'inicio':
            await loadPage('./resources/views/inicio.html', '#content')
            break

        case 'productos':
            await loadPage('./resources/views/ajustes-basicos.html', '#content')
            break

        case 'flexbox':
            await loadPage('./resources/views/flexbox.html', '#content')
            break

        case 'alineación':
            await loadPage('./resources/views/alineacion.html', '#content')
            break
        // ...
        default:
            await loadPage('./resources/views/inicio.html', '#content')
    }

}

async function fetchData(url, data = {}) {

    if (!('headers' in data)) {
        data.headers = {
            'Content-Type': 'application/json'
        }
    }

    if ('body' in data) {
        data.body = JSON.stringify(data.body)
    }

    const response = await fetch(url, data)

    if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`)
    }

    return await response.json()

}

async function loadPage(url, container) {
    const response = await fetch(url)

    if (response.ok) {
        const html = await response.text()
        document.querySelector(container).innerHTML = html
        return
    }

    throw new Error(`${response.status} - ${response.statusText}`)
}