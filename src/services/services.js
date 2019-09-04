    export const getCustomerOrder = () => {
        let url = `https://rg8lpt8cg3.execute-api.eu-west-1.amazonaws.com/default/lambdaCustomerOrders`

        fetch(url)
          .then(response => response.json())
          .then(data => {
            console.log(data)
          }
            );
    }

    