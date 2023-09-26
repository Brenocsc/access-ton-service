import countapi from "countapi-js";

export class CountAPIService {

  async totalCount () {
    await countapi.visits().then((result) => {
      console.log(result.value);
    });
  }

  async create () {
    try {
      const res = await countapi.create({
        namespace: "ton.com.br"
      });
  
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}