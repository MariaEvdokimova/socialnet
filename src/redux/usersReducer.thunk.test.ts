import {actions, follow, unfollow} from "./usersReducer";
import {userAPI} from '../api/users-api';
import {APIResponseType, ResultCodeEnum} from "../api/api";

jest.mock('../api/users-api');
const userAPIMock = userAPI as jest.Mocked<typeof userAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    userAPIMock.follow.mockClear();
    userAPIMock.unfollow.mockClear();
})

const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

test('success follow thunk', async () => {
    userAPIMock.follow.mockReturnValue(Promise.resolve(result));

    const thunk = follow(1);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleUsersFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollowed(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleUsersFollowingProgress(false, 1))
});

test('success unfollow thunk', async () => {
    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result));

    const thunk = unfollow(1);
    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleUsersFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollowed(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleUsersFollowingProgress(false, 1))
});
