
/**
 * Created by Edel on 02/04/2018.
 */
export interface Response <T>
{
    message?: string;
    status?: string;
    data?: T;
}
