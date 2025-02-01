export type Post = {
    title: string,
    date: string,
    type: PostType,
    url: string,
    description: string,
    content: string,
    contentType: ContentType | undefined,
    photo: string,
    audio: string,
}

export type PostType = 'music' | 'code' | 'project' | 'other';
export type ContentType = 'iframe' | 'file' | 'carousel';
