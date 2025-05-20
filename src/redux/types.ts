export type RouteSlice = RouteAnimations & ThunkStatus & {};

type RouteAnimations = {
    didAnimationPlay: boolean,
}

export type ThunkStatus = {
    isLoading: boolean,
    error: string | undefined,
}
