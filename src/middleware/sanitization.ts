import { Request, Response, NextFunction } from 'express';

/**
 * Recursively sanitizes an object by removing keys that start with '$' or contain '.'
 * This is to prevent NoSQL injection attacks.
 * Modifies the object in-place.
 */
function sanitize(obj: any): any {
  if (!obj) return obj;
  
  if (obj instanceof Date || obj instanceof RegExp) return obj;
  
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      obj[i] = sanitize(obj[i]);
    }
    return obj;
  }
  
  if (typeof obj === 'object') {
    Object.keys(obj).forEach(key => {
      if (key.startsWith('$') || key.includes('.')) {
        delete obj[key];
      } else {
        sanitize(obj[key]);
      }
    });
  }
  
  return obj;
}

export const mongoSanitize = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body) {
      sanitize(req.body);
    }
    if (req.query) {
      sanitize(req.query);
    }
    if (req.params) {
      sanitize(req.params);
    }
    next();
  };
};
