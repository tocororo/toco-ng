
import { Common } from '../../utils/common';

export class TestCommon
{
	private static function_1(): void
    { }

    private static function_2(): number
    { return -1; }

	/**
	 * Tests the `Common.cloneValueToUndefined` method. 
	 */
	public static test_Common_cloneValueToUndefined(): void
    {
        let target1: any = {};
        let target2: any = {
            'aa': 12,
            'bb': 'book',
            'cc': undefined
        };
        let target3: any = {
            'aa': 12,
            'bb': 'book',
            'cc': undefined,
            'dd': {},
            'ee': {
                'aa1': 12,
                'bb1': 'book'
            },
            'ff': [],
            'gg': [121, 'book1'],
            'hh': [
                {
                    'aa2': 1211,
                    'bb2': 'book11'
                },
                {
                    'aa3': 12111,
                    'bb3': 'book111',
                    'cc': undefined
                }
            ]
        };

        let target4: any = [];
        let target5: any = [12, 'book', undefined];
        let target6: any = [
            12,
            'book',
            undefined,
            {},
            {
                'aa1': 12,
                'bb1': 'book'
            },
            [],
            [121, 'book1'],
            [
                {
                    'aa2': 1211,
                    'bb2': 'book11'
                },
                {
                    'aa3': 12111,
                    'bb3': 'book111',
                    'cc': undefined
                }
            ]
        ];

        let target7: any = undefined;

        /* Its has functions as members. */
        let target8: any = {
            'aa': undefined,
            'function_1': TestCommon.function_1,
            'function_2': TestCommon.function_2
        };
        let target9: any = [
            undefined,
            TestCommon.function_1,
            TestCommon.function_2
        ];

        let result: any;

        result = Common.cloneValueToUndefined(target1);
        console.log('target1: ', target1, 'clone target1: ', result);

        result = Common.cloneValueToUndefined(target2);
        console.log('target2: ', target2, 'clone target2: ', result);

        result = Common.cloneValueToUndefined(target3);
        console.log('target3: ', target3, 'clone target3: ', result);

        result = Common.cloneValueToUndefined(target4);
        console.log('target4: ', target4, 'clone target4: ', result);

        result = Common.cloneValueToUndefined(target5);
        console.log('target5: ', target5, 'clone target5: ', result);

        result = Common.cloneValueToUndefined(target6);
        console.log('target6: ', target6, 'clone target6: ', result);

        result = Common.cloneValueToUndefined(target7);
        console.log('target7: ', target7, 'clone target7: ', result);

        result = Common.cloneValueToUndefined(target8);
        console.log('target8: ', target8, 'clone target8: ', result);

        result = Common.cloneValueToUndefined(target9);
        console.log('target9: ', target9, 'clone target9: ', result);
    }
}
