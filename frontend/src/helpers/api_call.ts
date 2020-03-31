
export async function callUrl(url: string, options?: any): Promise<any> {

    return new Promise<any>(
        resolve => fetch(url, options).then(
            (response) => {
                response.json().then(
                    (res) => {
                        resolve(res);
                    }
                )

            }
        )
    );
}