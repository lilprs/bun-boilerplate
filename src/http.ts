import { file, FileBlob } from 'bun'
import { global_state } from './global_state.js'

const template_names = ['layout', 'index'] as const

const templates = Object.fromEntries(
  await Promise.all(
    template_names.map(async (template) => [
      template,
      await file(`./templates/${template}.html`).text(),
    ])
  )
) as Record<typeof template_names[number], string>

const static_file_names = [
  'global.css',
  'images/moomin.png',
] as const

const static_files = Object.fromEntries(
  static_file_names.map((filename) => [
    filename,
    file(`./static/${filename}`),
  ])
) as Record<typeof static_file_names[number], FileBlob>

export function handleHttpRequest(req: Request): Response {
  const pathname = new URL(req.url).pathname.substring(1)

  if (pathname.startsWith('static/')) {
    const without_prefix = pathname.replace('static/', '')
    if (without_prefix in static_files) {
      return new Response(
        file(`./static/${without_prefix}`)
      )
    }
  }

  if (pathname === '') {
    return new Response(
      templates.layout.replace(
        '{{ main }}',
        templates.index.replace(
          '{{ reload_count }}',
          `${global_state.reload_count}`
        )
      ),
      {
        headers: {
          'Content-Type': 'text/html',
        },
      }
    )
  }

  return new Response('', {
    status: 301,
    headers: {
      Location: '/',
    },
  })
}
