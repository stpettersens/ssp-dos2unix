/*
dos2unix implementation with Node.js.
Copyright 2016 Sam Saint-Pettersen.

Native add-on.

Released under the MIT License; 
see LICENSE file.
*/

#include <nan.h>
#include <string>
#include <iostream>
#include "dos2unix.h"

void export_dos2unix(const Nan::FunctionCallbackInfo<v8::Value>& info) {

    if (info.Length() < 2) {
        Nan::ThrowTypeError("dos2unix-native: Wrong number of arguments");
        return;
    }

    if (!info[0]->IsString() || !info[1]->IsNumber()) {
        Nan::ThrowTypeError(
        "dos2unix-native: Arguments should be string, number (int: 0 or 1)");
        return;
    }

    v8::String::Utf8Value filename(info[0]->ToString());
    int feedback = (int)info[1]->NumberValue();
    v8::Local<v8::Number> code = Nan::New(dos2unix(std::string(*filename)));

    if (code->IntegerValue() == 1 && feedback == 1) {
        std::cout << "dos2unix-native: File already has UNIX line endings or is binary." << std::endl;
        return;
    }

    info.GetReturnValue().Set(code);
}

void init(v8::Local<v8::Object> exports) {
    exports->Set(Nan::New("dos2unix").ToLocalChecked(),
    Nan::New<v8::FunctionTemplate>(export_dos2unix)->GetFunction());
}

NODE_MODULE(addon, init)
