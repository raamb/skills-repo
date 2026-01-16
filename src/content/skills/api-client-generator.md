---
name: api-client-generator
description: Generates type-safe API client code from OpenAPI/Swagger specifications. Use when working with APIs, generating client SDKs, or when the user provides an OpenAPI spec.
allowed-tools: Read, Write, Bash(npm:*)
author: devtools
authorUrl: https://github.com/devtools
tags: ["api", "codegen", "typescript"]
dateAdded: 2024-01-18
platform: Claude
---

# API Client Generator

Automatically generates type-safe TypeScript/JavaScript API client code from OpenAPI (Swagger) specifications.

## Features

- Generates TypeScript interfaces from schemas
- Creates type-safe API methods
- Handles authentication patterns
- Supports request/response interceptors
- Includes error handling

## Input Requirements

The OpenAPI specification file should be:
- OpenAPI 3.0+ format
- Valid JSON or YAML
- Contains paths, schemas, and operations

## Steps

1. **Read the OpenAPI spec**:
   ```bash
   # Locate the spec file
   find . -name "openapi.json" -o -name "swagger.json" -o -name "openapi.yaml"
   ```

2. **Parse and validate** the specification structure

3. **Generate TypeScript interfaces** from schema definitions:
   - Convert OpenAPI types to TypeScript types
   - Handle nested objects and arrays
   - Support enums and unions

4. **Generate API client class**:
   - Create methods for each endpoint
   - Add type annotations for parameters and responses
   - Include JSDoc comments from descriptions

5. **Write output files**:
   ```
   src/api/
   ├── types.ts          # Generated interfaces
   ├── client.ts         # API client class
   └── index.ts          # Exports
   ```

## Example Output Structure

```typescript
// types.ts
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
}

// client.ts
export class ApiClient {
  constructor(private baseUrl: string) {}

  async getUser(id: string): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users/${id}`);
    return response.json();
  }

  async createUser(data: CreateUserRequest): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
}
```

## Configuration Options

Ask the user for preferences:
- Target language (TypeScript, JavaScript)
- Output directory
- Authentication method (Bearer token, API key, OAuth)
- Include request/response interceptors
- Generate mock data for testing

## Supported OpenAPI Features

- ✅ GET, POST, PUT, PATCH, DELETE methods
- ✅ Path parameters
- ✅ Query parameters
- ✅ Request/response bodies
- ✅ Schema references ($ref)
- ✅ Authentication schemes
- ✅ Enums and constants
- ⚠️ File uploads (basic support)
- ⚠️ Webhooks (limited)
