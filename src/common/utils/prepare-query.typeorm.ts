import { BadRequestException } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { SearchDto } from '../dto/search.dto';

export function prepareQuery(
  query: SelectQueryBuilder<any>,
  searchDto: SearchDto,
): SelectQueryBuilder<any> {
  const alias = query.alias;
  let { filter, attributes } = searchDto;
  if (filter) {
    filter = processFilter(alias, filter);
    query.where(filter.q, filter.val);
  }
  if (attributes) {
    attributes = processAttributes(alias, attributes);
    query.select(attributes);
  }
  return query;
}

const OP = {
  $eq: '=',
  $like: 'LIKE',
  $in: 'IN',
};

function processFilter(
  alias: string,
  filter: any,
  conditional: string = null,
): { q: string; val: any } {
  const q = [];
  let val = {};
  let where;
  for (const key of Object.keys(filter)) {
    switch (key) {
      case '$and':
        where = processFilter(alias, filter[key], 'AND');
        q.push(`(${where.q})`);
        val = Object.assign(val, where.val);
        break;

      case '$or':
        where = processFilter(alias, filter[key], 'OR');
        q.push(`(${where.q})`);
        val = Object.assign(val, where.val);
        break;

      default:
        const [op] = Object.keys(filter[key]);
        switch (op) {
          case '$eq':
          case '$like':
            q.push(`${alias}.${key} ${OP[op]} :${key}`);
            val[key] = filter[key][op];
            break;
          case '$in':
            q.push(`${alias}.${key} ${OP[op]} (:...${key})`);
            val[key] = filter[key][op];
            break;

          default:
            throw new BadRequestException(`operator '${op}' not supported`);
        }
    }
  }
  if (q.length === 1) {
    return { q: q[0], val };
  }
  if (!conditional)
    throw new BadRequestException('missing conditional ($and|$or)');
  return { q: q.join(` ${conditional} `), val };
}

function processAttributes(alias: string, attributes: any[]): any[] {
  return attributes.map((attribute) => `${alias}.${attribute}`);
}
