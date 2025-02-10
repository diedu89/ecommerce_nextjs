/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** Date with time (isoformat) */
  DateTime: { input: any; output: any };
};

export type Mutation = {
  __typename?: "Mutation";
  createProduct: ProductType;
  createUser: UserType;
  deleteProduct: Scalars["Boolean"]["output"];
  updateProduct?: Maybe<ProductType>;
  updateUser: UserType;
};

export type MutationCreateProductArgs = {
  productData: ProductCreateInput;
};

export type MutationCreateUserArgs = {
  userData: UserCreateInput;
};

export type MutationDeleteProductArgs = {
  productId: Scalars["Int"]["input"];
};

export type MutationUpdateProductArgs = {
  productData: ProductUpdateInput;
  productId: Scalars["Int"]["input"];
};

export type MutationUpdateUserArgs = {
  userData: UserUpdateInput;
  userId: Scalars["Int"]["input"];
};

export type PaginationInput = {
  page?: Scalars["Int"]["input"];
  size?: Scalars["Int"]["input"];
};

export type ProductCreateInput = {
  category: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  image: Scalars["String"]["input"];
  isActive?: Scalars["Boolean"]["input"];
  price: Scalars["Float"]["input"];
  stock: Scalars["Int"]["input"];
  title: Scalars["String"]["input"];
};

export type ProductPagination = {
  __typename?: "ProductPagination";
  /** List of items in current page */
  items: Array<ProductType>;
  /** Current page number */
  page: Scalars["Int"]["output"];
  /** Total number of pages */
  pages: Scalars["Int"]["output"];
  /** Items per page */
  size: Scalars["Int"]["output"];
  /** Total number of items */
  total: Scalars["Int"]["output"];
};

export type ProductType = {
  __typename?: "ProductType";
  category: Scalars["String"]["output"];
  createdAt: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  id: Scalars["Int"]["output"];
  image: Scalars["String"]["output"];
  isActive: Scalars["Boolean"]["output"];
  price: Scalars["Float"]["output"];
  stock: Scalars["Int"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type ProductUpdateInput = {
  category: Scalars["String"]["input"];
  description: Scalars["String"]["input"];
  image: Scalars["String"]["input"];
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  price?: InputMaybe<Scalars["Float"]["input"]>;
  stock?: InputMaybe<Scalars["Int"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
};

export type Query = {
  __typename?: "Query";
  me: UserType;
  product?: Maybe<ProductType>;
  products: ProductPagination;
  user?: Maybe<UserType>;
  users: UserPagination;
};

export type QueryProductArgs = {
  productId: Scalars["Int"]["input"];
};

export type QueryProductsArgs = {
  pagination?: PaginationInput;
};

export type QueryUserArgs = {
  userId: Scalars["Int"]["input"];
};

export type QueryUsersArgs = {
  pagination?: PaginationInput;
};

export type UserCreateInput = {
  email: Scalars["String"]["input"];
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type UserPagination = {
  __typename?: "UserPagination";
  /** List of items in current page */
  items: Array<UserType>;
  /** Current page number */
  page: Scalars["Int"]["output"];
  /** Total number of pages */
  pages: Scalars["Int"]["output"];
  /** Items per page */
  size: Scalars["Int"]["output"];
  /** Total number of items */
  total: Scalars["Int"]["output"];
};

export type UserType = {
  __typename?: "UserType";
  createdAt: Scalars["DateTime"]["output"];
  email: Scalars["String"]["output"];
  firstName?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["Int"]["output"];
  isActive: Scalars["Boolean"]["output"];
  isSuperuser: Scalars["Boolean"]["output"];
  lastName?: Maybe<Scalars["String"]["output"]>;
  updatedAt: Scalars["DateTime"]["output"];
  username: Scalars["String"]["output"];
};

export type UserUpdateInput = {
  email: Scalars["String"]["input"];
  firstName?: InputMaybe<Scalars["String"]["input"]>;
  isActive?: InputMaybe<Scalars["Boolean"]["input"]>;
  lastName?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  username: Scalars["String"]["input"];
};

export type ProductsQueryVariables = Exact<{ [key: string]: never }>;

export type ProductsQuery = {
  __typename?: "Query";
  products: {
    __typename?: "ProductPagination";
    total: number;
    page: number;
    size: number;
    pages: number;
    items: Array<{
      __typename?: "ProductType";
      title: string;
      description: string;
      price: number;
      category: string;
      image: string;
      stock: number;
      isActive: boolean;
      id: number;
    }>;
  };
};

export const ProductsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "products" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "products" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "items" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "price" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "category" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "image" } },
                      { kind: "Field", name: { kind: "Name", value: "stock" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "isActive" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "total" } },
                { kind: "Field", name: { kind: "Name", value: "page" } },
                { kind: "Field", name: { kind: "Name", value: "size" } },
                { kind: "Field", name: { kind: "Name", value: "pages" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>;
