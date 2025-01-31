import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";
import classes from './Home.module.scss';
import { useEffect, useState } from "react";
import { jodyswebsite } from "src/axios/config"; 
import { Post } from "./types";
import { AxiosResponse } from "axios";

export const Home = () => {

    const [posts,setPosts] = useState<Post[]>([]);

    useEffect(() => {
        jodyswebsite.get('posts.php').then((res: AxiosResponse<Post[]>) => {
            setPosts(res.data);
        });
    },[]);


    return (
        <Flex justifyContent="center" flexWrap="wrap" className={classes.home}>
            <FlexItem width={'100%'}>
                <h5 className={classes.intro}>
                    Hi there! Thanks for coming to my website.<br/>
                    Stay as long as you like, be on the lookout for hidden easter eggs and, please, scroll responsibly!
                </h5>
                <hr/>
            </FlexItem>

            <FlexItem width='20%'>
                {posts.map((post,i) => (
                    <p key={i}>{post.title}</p>
                ))}
            </FlexItem>
        </Flex>
    );
}
