clear all;
close all;
clc;

ii = 661
jj = 286

ii = 629
jj = 273

M = 1000;
N = 1000;
I = ones(M, N, 3);
I(:, :, 1) = 255 * I(:, :, 1);
I(:, :, 2) = 128 * I(:, :, 2);
I(:, :, 3) = 128 * I(:, :, 3);
preto = zeros(1, 1, 3);

i0 = 0;
j0 = 0;
R = M / 2;

li = [];
lj = [];

for theta = 0 : 5 : 360
    i = R * cosd(theta);
    j = R * sind(theta);
    li = [li, i];
    lj = [lj, j];
end

Rg = 200;
for i = 1 : M
    for j = 1 : N
        for k = 1 : length(lj)
            i0 = li(k);
            j0 = lj(k);
            dist = (i - i0)^2 + (j - j0)^2;
            if (Rg-1)^2 <= dist && dist <= (Rg+1)^2
                I(i, j, :) = preto;
            end
        end
    end
end

imwrite(uint8(I), 'saida.png');