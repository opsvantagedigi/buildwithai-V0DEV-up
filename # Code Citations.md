# Code Citations

## License: MIT
https://github.com/DestinyItemManager/dim-api/tree/377b82785681b17a266f37e9f367a939fc56dcf3/api/db/index.ts

```
.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release
```

