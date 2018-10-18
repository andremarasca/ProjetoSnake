clear all;
close all;
clc;

I = imread('comida.png');
I = rgb2gray(I);
[M, N] = size(I);

y = zeros(1 , N);
for j = 1 : N
    for i = 1 : M
        y(j) = 1 - (i-1) / (M-1);
        if I(i, j) ~= 255
            break;
        end
    end
end
y = y * 1.5;
y = y - y(1) + 1;

plot(y);