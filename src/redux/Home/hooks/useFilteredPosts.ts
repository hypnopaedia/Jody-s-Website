import { usePosts } from "src/redux/Home/hooks/usePosts";
import { useFilter } from "src/redux/Home/hooks/useFilter";
import { useMemo } from "react";
import { Post } from "src/redux/Home/types";

export const useFilteredPosts = () => {
    const posts = usePosts();

    const filter = useFilter();

    return useMemo(() => {
        if ( !filter ) return posts;

        const preparedFilter = filter.trim().toLowerCase();

        const postSet = new Set<Post>([
            ...posts.filter((post) => post.title.toLowerCase().includes(preparedFilter)),
            ...posts.filter((post) => post.description.slice(0,300).toLowerCase().includes(preparedFilter)),
            ...posts.filter((post) => post.date.toLowerCase().includes(preparedFilter))
        ]);

        return Array.from(postSet);
    },[posts,filter]);
}
