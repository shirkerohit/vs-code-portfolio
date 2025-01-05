export interface FileType {
  name: string
  type: 'file' | 'folder'
  content?: string
  children?: FileType[]
  path: string
  icon?: string
}

// Mock function to simulate fetching file content
const fetchFileContent = async (relativePath: string): Promise<string> => {
  const contentMap: { [key: string]: string } = {
    '../content/app/about/bio.md': `# About Me

I'm a Senior Software Engineer with over 8 years of experience in web development. 
I specialize in building scalable applications using React, Node.js, and TypeScript.

## Skills
- Frontend: Pure JS, React, Angular, Vue, TypeScript
- Backend: PHP (Laravel/Zend) Node.js, Express, NestJS
- DevOps: Docker, Kubernetes, AWS
- Database: PostgreSQL, MongoDB`,
    '../content/app/about/experience.md': `
    
# Professional Experience
- Software developer (2016) Surpass collaboration technologies.
- Senior Software Engineer at Bigrattle technologies (2016-2020)
- Staff softwared engineer People Interactive (2020-present)`,
    '../content/app/contact/details.md': `# Contact Information

- Email: NA
- Github : [https://github.com/shirkerohit](https://github.com/shirkerohit)
- LinkedIn: [https://rohit-shirke.medium.com/](https://rohit-shirke.medium.com/)
- Twitter: [https://twitter.com/rohit_p_shirke](https://twitter.com/rohit_p_shirke)
- Website : [https://shirkerohit.github.io/](https://shirkerohit.github.io/)

Feel free to reach out for collaborations or opportunities!`,
    '../content/portfolio/projects.md': `# Projects
## Checkout Github Repositories!`,
    '../content/portfolio/talks.md': `# Talks
## Coming soon`,
    '../content/README.md': ` 
# Welcome to My Portfolio

This is my developer portfolio showcasing my projects, talks, and experience.
Feel free to explore the different sections using the file explorer or quick open (Ctrl+P).

## Navigation
- /portfolio - View my projects and talks
- /app/about - Learn more about me
- /app/contact - Get in touch`
  };

  return contentMap[relativePath] || '';
};

export const files: FileType[] = [
  {
    name: 'portfolio',
    type: 'folder',
    path: '/portfolio',
    children: [
      {
        name: 'Rohit P Shirke',
        type: 'folder',
        path: '/app',
        children: [
          {
            name: 'about',
            type: 'folder',
            path: '/app/about',
            children: [
              {
                name: 'bio.md',
                type: 'file',
                path: '/app/about/bio.md',
                content: await fetchFileContent('../content/app/about/bio.md')
              },
              {
                name: 'experience.md',
                type: 'file',
                path: '/app/about/experience.md',
                content: await fetchFileContent('../content/app/about/experience.md')
              }
            ]
          },
          {
            name: 'contact',
            type: 'folder',
            path: '/app/contact',
            children: [
              {
                name: 'details.md',
                type: 'file',
                path: '/app/contact/details.md',
                content: await fetchFileContent('../content/app/contact/details.md')
              }
            ]
          }
        ]
      },
      {
        name: 'projects.md',
        type: 'file',
        path: '/portfolio/projects.md',
        content: await fetchFileContent('../content/portfolio/projects.md')
      },
      {
        name: 'talks.md',
        type: 'file',
        path: '/portfolio/talks.md',
        content: await fetchFileContent('../content/portfolio/talks.md')
      }
    ]
  },
  {
    name: 'README.md',
    type: 'file',
    path: '/README.md',
    content: await fetchFileContent('../content/README.md')
  }
];

export function findFile(path: string, fileTree: FileType[] = files): FileType | null {
  for (const file of fileTree) {
    if (file.path === path) return file
    if (file.children) {
      const found = findFile(path, file.children)
      if (found) return found
    }
  }
  return null
}

export function getAllFiles(fileTree: FileType[]): FileType[] {
  let allFiles: FileType[] = []
  for (const item of fileTree) {
    if (item.type === 'file') {
      allFiles.push(item)
    }
    if (item.children) {
      allFiles = allFiles.concat(getAllFiles(item.children))
    }
  }
  return allFiles
}

