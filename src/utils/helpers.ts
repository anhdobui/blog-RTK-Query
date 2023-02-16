import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Post } from 'types/blog.type'
type ErrorFormObject = {
  [key in keyof Omit<Post, 'id'>]: string | ErrorFormObject | ErrorFormObject[]
}
type EntityError = {
  status: 422
  data: {
    error: ErrorFormObject
  }
}
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function isErrorWithMessage(
  error: unknown
): error is { message: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}

export function isEntityError(error: unknown): error is EntityError {
  return (
    isFetchBaseQueryError(error) &&
    typeof error.data === 'object' &&
    error.data !== null &&
    !(error.data instanceof Array)
  )
}
