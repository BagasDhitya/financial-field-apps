export default {
  async find(ctx: any) {
    const query = ctx.query;

    const response = await fetch(
      `https://external-market.example.com/v1/insights?populate=*&limit=${query.limit || 10}`,
    );
    const payload = await response.json();

    const items = payload.data.map((row: any) => ({
      id: row.id,
      headline: row.attributes.title.trim(),
      sourceName: row.attributes.source.data.attributes.name,
      coverUrl: row.attributes.cover.data.attributes.url,
    }));

    ctx.body = {
      data: items,
      meta: {
        total: payload.meta.pagination.total,
      },
    };
  },
};
