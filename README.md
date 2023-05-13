# Frankfurt Times Vue3 | Vite Client

## Folder Structure

The folder to add, edit and delete data and articles is the `public` folder.

- Images in the public folder may be used in articles.
- `teamData.json` here you may edit your _team_. The Syntax:

```json
{
  "name": {
    "name": "<YOUR-NAME>",
    "job": "<YOUR-JOB>",
    "img": "<src-TO-THE-IMAGE-OF-YOUR-TEAM-MEMBER>",
    "about": "SOME-TEXT"
  }
}
```

- `titlePage.json` here you may edit the title Page of your Newspaper. The Syntax:
  **! In WORK !**

```json
{}
```

- `articleData.json` here you _write_ your articles. The Syntax:
(-> Into the Arrays you write Articles like in the [types/article.ts](https://github.com/Barsch2006/frankfurttimes/blob/master/src/types/article.ts))

```json
{
   "frankfurt": [],
   "wirtschaft": [],
   "usa": [],
   "international": []
}
```

## Functions

In the `text` of an article and in the `preview_text` you have to option to use:

- `**<TEXT>**` to make your text bold
- `*<TEXT>*` to make your text italic
- `__<TEXT>__` to underline your text
