---
slug: "ryze-setup"
title: "Setting Up and Running Ryze Locally"
description: "Complete local setup for Ryze with clone, install, and run commands, common troubleshooting fixes, and recommended next steps."
date: 2025-11-21
author: "Rahul"
tags: ["ryze", "setup", "development"]
featured: true
---

<hr />

## Initial Setup

This guide walks through cloning, installing dependencies, running the dev server, and resolving the most common setup failures. Follow the steps carefully to get Ryze up and running on your local machine.

<br />

##### Prerequisites

1. Node.js 18.x or later (LTS recommended): Astro v5 requires modern Node features and stable async handling.
2. One of these package managers:
   - **npm** (bundled with Node)
   - **yarn**
   - **pnpm**

### [Cloning the Repository](#cloning-the-repository)

Now that prerequisites are met, you need to get the Ryze repository on your computer. Choose the method that works best for you.

#### [HTTPS Method](#https-method)

The simplest method, no SSH keys required. Paste this command in your terminal.

```bash
git clone https://github.com/yourusername/Ryze.git
cd Ryze
```

If prompted for authentication, enter your GitHub username and a personal access token (instead of your password). You can generate one at [GitHub Settings → Developer Settings → Personal Access Tokens](https://github.com/settings/tokens).

<table>
	<thead>
		<tr>
			<th>Advantages</th>
			<th>Disadvantages</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>No setup required</td>
			<td>Requires personal access token or password</td>
		</tr>
		<tr>
			<td>Great for first-time users</td>
			<td>Slower than SSH for repeated operations</td>
		</tr>
    </tbody>
</table>

<br />

#### [SSH Method](#ssh-method)

Faster and more secure if you've set up SSH keys with GitHub. If you haven't, follow [GitHub's SSH setup guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).

```bash
git clone git@github.com:yourusername/Ryze.git
cd Ryze
```

<table>
	<thead>
		<tr>
			<th>Advantages</th>
			<th>Disadvantages</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>No credentials needed after setup</td>
			<td>Requires initial SSH key setup</td>
		</tr>
		<tr>
			<td>Industry standard for developers</td>
			<td>Slightly higher learning curve</td>
		</tr>
	</tbody>
</table>

<br />

#### [GitHub CLI Method](#github-cli-method)

If you have [GitHub CLI](https://cli.github.com) installed, this is the quickest option.

```bash
gh repo clone yourusername/Ryze
cd Ryze
```

<table>
	<thead>
		<tr>
			<th>Advantages</th>
			<th>Disadvantages</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>No need to remember URLs</td>
			<td>Requires GitHub CLI installation</td>
		</tr>
		<tr>
			<td>Automatically handles authentication</td>
			<td>Less common than HTTPS/SSH methods</td>
		</tr>
		<tr>
			<td>Great for users already using GitHub CLI</td>
			<td>Limited to users familiar with CLI tools</td>
		</tr>
	</tbody>
</table>

<br />

### [Installing Dependencies](#installing-dependencies)

#### Install and Run

```powershell
npm install
npm run dev
```

Preview: `http://localhost:4321`
<br />
Troubleshooting: use `nvm` to switch Node versions.
<br />
Dev features:

- Hot Module Replacement (HMR) for fast iteration
- Automatic rebuilds on file change

To stop the dev server: press <kbd>CTRL</kbd> + <kbd>C</kbd> in the terminal.

<br />

### Editing files

#### [tsconfig / jsconfig](#tsconfig--jsconfig)

Ryze can use either TypeScript or JavaScript (or both). The config file tells Astro which language rules to follow.

```json
{
  "extends": "astro/configs/strict",
  "compilerOptions": {
    "moduleResolution": "bundler",
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@pages/*": ["src/pages/*"]
    }
  }
}
```

Key options:

- **moduleResolution**: How imports are resolved
- **baseUrl**: Base directory for imports
- **paths**: Aliases for cleaner imports

Useful for avoiding long relative paths. For example:

```typescript
import Header from "@components/Header.astro";
// Instead of:
import Header from "../../../components/Header.astro";
```

<br />

#### [Configuration Files](#configuration-files)

Edit these files to customize your site's behavior and appearance:

`astro.config.mjs` - Site metadata and integrations

```javascript
export default defineConfig({
  site: "https://yourdomain.com",
  integrations: [tailwind(), react()],
});
```

<br />

#### [Content & Metadata](#content--metadata)

Edit `src/blog` markdown files to change posts. Update the frontmatter.

```markdown
---
slug: "your-post"
title: "Your Title"
description: "Your description"
date: 2025-01-01
author: "Your Name"
tags: ["tag1", "tag2"]
featured: true
---
```

<br />

#### [Styling & Colors](#styling--colors)

- **Global styles**: Edit `src/styles/global.css`
- **Typography**: Edit `src/styles/typography.css`

#### [Components](#components)

Replace components in `src/components` to customize:

- **Header.astro** — Navigation bar
- **Footer.astro** — Footer content
- **PostCard.astro** — Blog post previews
- **Seo.astro** — Meta tags

<br />

### [Next Steps](#next-steps)

Now that your project is set up and running, you're ready to start building:

1. **Create pages**: Add `.astro` files to `src/pages`
2. **Build components**: Create reusable Astro components in `src/components`
3. **Write content**: Add markdown files to `src/blog` with your posts
4. **Deploy**: Build with `npm run build` and deploy `dist` folder

<br />
<br />

To know more about how Ryze is being deployed, check out [Deploying Ryze using Cloudflare](https://ryze.pages.dev/deploying-ryze). Happy coding!

---
