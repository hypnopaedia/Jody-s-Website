import clsx from 'clsx';
import classes from './About.module.scss';
import { Flex } from "src/components/shared/Flex/Flex";
import { FlexItem } from "src/components/shared/Flex/FlexItem/FlexItem";

export const About = () => {
    return (
        <Flex justifyContent="center" flexWrap="wrap" className={clsx(classes.about, 'fade-in-from-right')}>
            <FlexItem col={12} md={3} className={clsx(classes.summary, 'py-0 py-md-3')}>
                <Flex justifyContent="center" flexWrap='wrap'>
                    <FlexItem col={12} className='d-none d-md-block'>
                        <Flex justifyContent="center">
                            <img className={classes.profilePhoto} src="https://s13.gifyu.com/images/b2m3U.jpg" loading="lazy" title="It's Me!" />
                        </Flex>
                    </FlexItem>
                    <FlexItem col={9} className='d-none d-md-block py-2'>
                        <hr/>
                    </FlexItem>
                    <FlexItem col={12} className={clsx('px-2 px-md-0 px-lg-2 px-xxl-4', classes.summaryText)}>
                        <h4>Jody Salani <span className={classes.pronouns}>He/Him</span></h4>
                        <hr/>
                        <h5>
                            <span className='bold'>Located:</span>{' '}
                            <span className={classes.answer}>Philadelphia, PA (presumably)</span>
                        </h5>
                        <h5>
                            <span className='bold'>Likes:</span>{' '}
                            <span className={classes.answer}>Music, Web &amp; Game Dev, His Cat (Sometimes), 日本語, Pokemon, Movies that Hurt, Calvin &amp; Hobbes</span>
                        </h5>
                        <h5>
                            <span className='bold'>Dislikes:</span>{' '}
                            <span className={classes.answer}>Sports, His Cat (Sometimes), The Insanity of it All</span>
                        </h5>
                    </FlexItem>
                </Flex>
            </FlexItem>
            <FlexItem col={12} md={9} className={classes.bio}>
                <p>
                    Jody Salani is a composer and programmer from the Philadelphia region. 
                    After graduating magna cum laude from Drexel University with a BS in Music Industry and a Master's in Business Administration -- neither of which he finds any use for, whatsoever -- Jody suddenly realized that his passion for music was bested only by the compulsive need to be able to pay off his student loans. 
                    He promptly got into coding. 
                </p>
                <p>
                    I'm going to stop speaking in third-person now.
                </p>
                <p>
                    I love the creative, the intellectual, and the beautiful. That means anything from well-written code, to a beautiful spring morning, to statistics, to the long-lost "science" of alchemy, to broadway musicals (have you seen Wicked?? Stephen Schwartz isn't human).
                </p>
                <p>
                    I often find myself fascinated with the strange, the absurd, and the macabre. I like the idea of David Lynch's movies more than I enjoy watching them. I like when David Byrne wears big suits. I like what David Bowie has to say more than what he has to sing.
                </p>
                <p>
                    I am compulsive and neurotic. I struggle with Obsessive Compulsive Disorder. I've spent a lot of time stopping myself from doing the things I want to do with my life. I'm working on changing that. I'm still learning how to love myself. I'm learning that love is an action and not a feeling.
                </p>
                <p>
                    I've spent a lot of time with my head down, nose to the grindstone. I'm realizing that this alone doesn't work. Nobody is going to give you a hand up because you're a hard worker. Nobody is going to advocate for you if you don't advocate for yourself. 
                    The adults aren't coming to save you. The cavalry isn't coming. You are the cavalry.
                </p>
                <p>
                    Maybe things aren't the way they should be, but they're more or less the way they're going to be, unless you change that.
                </p>
                <p>
                    Maybe you're an instrument waiting to be played.
                </p>
                <p>
                    Maybe the treasure you seek is in the cave you're afraid to go in.
                </p>
                <p>
                    Some of these thoughts aren't my own.
                </p>
                <p>
                    Glory lies beyond the horizon. Challenge it because you know it to be unattainable.
                </p>
                <p>
                    - 010138CD
                </p>
                <p className='italic'>
                    INAF INMF<br/>
                    INHAA IHNH
                </p>
            </FlexItem>
        </Flex>
    );
}
