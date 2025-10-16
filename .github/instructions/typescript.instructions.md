# TypeScript编码规范

## 类型定义

### 基本类型

- 使用`string`、`number`、`boolean`等基本类型，避免使用`String`、`Number`、`Boolean`
- 使用`undefined`表示可选值，避免使用`null`
- 使用`unknown`代替`any`，除非确实需要完全的类型灵活性

```typescript
// 推荐
let name: string;
let age: number;
let isActive: boolean;

// 不推荐
let name: String;
let age: Number;
let data: any;
```

### 接口和类型别名

- 使用`interface`定义对象类型，使用`type`定义联合类型或交叉类型
- 接口名使用大驼峰命名法，并以描述性名词命名
- 为复杂类型创建类型别名，提高代码可读性

```typescript
// 推荐
interface UserProfile {
  id: string;
  name: string;
  age?: number;
}

type Status = 'pending' | 'active' | 'inactive';

// 不推荐
interface user {
  id: string;
  name: string;
  age: number | undefined;
}
```

### 泛型

- 使用描述性的泛型参数名称
- 限制泛型参数的范围，使用`extends`关键字

```typescript
// 推荐
function getFirst<T>(array: T[]): T | undefined {
  return array[0];
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

## 函数

### 函数声明

- 明确声明函数参数和返回值的类型
- 使用函数类型接口定义回调函数
- 为可选参数提供默认值

```typescript
// 推荐
function calculateTotal(price: number, quantity: number = 1): number {
  return price * quantity;
}

interface SearchCallback {
  (result: string[], count: number): void;
}
```

### 异步函数

- 使用`async/await`代替Promise链
- 明确声明Promise的返回类型

```typescript
// 推荐
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

## 类

### 类定义

- 使用访问修饰符（`public`、`private`、`protected`）
- 为类属性提供初始值或在构造函数中初始化
- 使用只读属性保护不可变数据

```typescript
// 推荐
class User {
  private readonly id: string;
  public name: string;
  protected createdAt: Date = new Date();

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}
```

## 模块

### 导入导出

- 优先使用命名导出而不是默认导出
- 按类型分组导入语句
- 避免使用通配符导入（`import * as`）

```typescript
// 推荐
import { useState, useEffect } from 'react';
import type { User, UserProfile } from './types';

export interface Config {
  // ...
}

export function initialize(): void {
  // ...
}
```

## 代码组织

### 文件命名

- 使用小写字母，单词间用连字符分隔
- 类型定义文件使用`.d.ts`扩展名
- 测试文件使用`.test.ts`或`.spec.ts`扩展名

```
user-profile.ts
types.d.ts
user-service.test.ts
```

### 代码结构

- 相关的类型定义放在一起
- 导出的类型和接口放在文件顶部
- 实现代码按照依赖关系排序

```typescript
// types.ts
export interface User {
  id: string;
  name: string;
}

export type UserRole = 'admin' | 'user';

// 实现代码...
```

## 注释

### 文档注释

- 为公共API添加JSDoc注释
- 描述函数的参数、返回值和可能的异常
- 使用`@example`提供使用示例

```typescript
/**
 * 计算给定价格的税后金额
 * @param price - 原始价格
 * @param taxRate - 税率（0-1之间的小数）
 * @returns 税后金额
 * @throws 如果税率无效
 * @example
 * calculateTax(100, 0.1) // 返回 110
 */
function calculateTax(price: number, taxRate: number): number {
  // ...
}
```

## 错误处理

### 异常处理

- 使用自定义错误类型
- 在异步函数中使用try-catch处理错误
- 避免吞掉错误，始终进行适当的错误处理

```typescript
// 推荐
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

async function processData(data: unknown): Promise<void> {
  try {
    // 处理数据
  } catch (error) {
    if (error instanceof ValidationError) {
      // 处理验证错误
    } else {
      // 处理其他错误
      throw error;
    }
  }
}
```

## 最佳实践

### 类型安全

- 启用严格的TypeScript编译器选项
- 避免使用类型断言，除非确实必要
- 使用类型守卫进行运行时类型检查

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}

// 类型守卫示例
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  );
}
```

### 性能优化

- 使用类型推断减少冗余的类型注释
- 避免过度使用泛型，可能导致编译性能下降
- 合理使用类型缓存，避免重复计算类型

```typescript
// 推荐
const numbers = [1, 2, 3]; // 类型推断为 number[]

// 不推荐
const numbers: number[] = [1, 2, 3]; // 冗余的类型注释
```