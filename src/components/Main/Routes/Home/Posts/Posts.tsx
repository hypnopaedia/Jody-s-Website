import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import { TilePost } from "./TilePost/TilePost";
import { useFilteredPosts } from "src/redux/Home/hooks/useFilteredPosts";
import { ListPost } from "./ListPost/ListPost";
import { useResponsiveViewMode } from "src/redux/Home/hooks/useResponsiveViewMode";

export const Posts = () => {
    const filteredPosts = useFilteredPosts();
    const viewMode = useResponsiveViewMode();

    if (!filteredPosts.length) return (
        <FlexItem style={{textAlign: 'center'}}>
            <h1>?</h1><br/>
            Your search didn't return any results!
        </FlexItem>
    );

    return (
        <>
            {filteredPosts.map((post,i) => (viewMode === 'Tile') ? (
                    <TilePost key={i} post={post} number={i} />
                ) : (
                    <ListPost key={i} post={post} number={i} />
                )
            )}
        </>
    );
}
